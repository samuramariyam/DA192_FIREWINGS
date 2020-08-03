package com.example.hospice1.ui.home;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hospice1.Departments;
import com.example.hospice1.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class HomeFragment extends Fragment {

    FirebaseFirestore db;
    RecyclerView rv;
    ArrayList<prod> usa;
    mcvadapter mc;
    View root;
    String uid1;
    //Activity co;
    // myrvholder holder;
    //LinearLayout l;

    private HomeViewModel homeViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        homeViewModel =
                ViewModelProviders.of(this).get(HomeViewModel.class);
        root = inflater.inflate(R.layout.fragment_home, container, false);
        // final TextView textView = root.findViewById(R.id.text_home);
        homeViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(@Nullable String s) {
                //textView.setText(s);
            }
        });
        return root;

    }


    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        usa = new ArrayList<>();
        recycler();
        setupfire();
        //addTest();
        load();
    }

    public void load() {
        if (usa.size() > 0)
            usa.clear();
        db.collection("Hospital").get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                for (DocumentSnapshot q : task.getResult()) {
                    prod p = new prod(q.getString("Hospital_name"), q.getString("Address"), q.getId(),q.getString("imagelink"));
                    usa.add(p);

                }
                mc = new mcvadapter(HomeFragment.this, usa);
                rv.setAdapter(mc);
            }
        })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {

                        Toast.makeText(getActivity(), "problem", Toast.LENGTH_SHORT).show();
                        Log.w("---1---", e.getMessage());
                    }
                });
    }

    private void addTest() {
        Random r = new Random();
        for (int i = 0; i < 1; i++) {

            Map<String, String> data = new HashMap<>();
            data.put("Hospital_name", "Hospital" + r.nextInt(50));
            data.put("Address", "Area" + r.nextInt(50));
           /* db.collection("Hospital").add(data)
                    .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                        @Override
                        public void onSuccess(DocumentReference documentReference) {
                            Toast.makeText(getActivity(), "added test data", Toast.LENGTH_SHORT).show();
                        }
                    });





            db.collection("Hospital").document(
                    "Hospital2").collection("Departments").add(data)
                    .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                        @Override
                        public void onSuccess(DocumentReference documentReference) {
                            Toast.makeText(getActivity(), "added test data", Toast.LENGTH_SHORT).show();
                        }
                    });*/

        }

    }

    public void loadDep(String p) {
        this.uid1 = p;


    }


    private void setupfire() {
        db = FirebaseFirestore.getInstance();
    }

    private void recycler() {
        rv = root.findViewById(R.id.rrv);
        rv.setHasFixedSize(true);
        rv.setLayoutManager(new LinearLayoutManager(getActivity()));

    }
    public void next(String uid) {
        Intent i = new Intent(getActivity(), Departments.class);

        i.putExtra("uid", uid);
        // i.putExtra("list",uso);
        startActivity(i);
    }

}