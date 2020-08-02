package com.example.hospice1;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class Departments extends AppCompatActivity {

    FirebaseFirestore db;
    RecyclerView rv;
    ArrayList<prod> usa;

    mcvadapter2 mc;
    myrvholder holder;
    LinearLayout l;
    public String uid;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_departments);
        Intent intent = getIntent();
        uid = intent.getStringExtra("uid");
        usa=new ArrayList<>();
        recycler();
        setupfire();
        Toast.makeText(Departments.this, uid, Toast.LENGTH_SHORT).show();
        //addTest();
        load();


    }

    public void load() {
        if(usa.size()>0)
            usa.clear();

        //db.collection("Hospital").document(usa.get(6).getUid()+"/Departments").get();/Hospital/Hospital1/Departments

        db.collection("/Hospital/"+uid+"/Departments").get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                for(DocumentSnapshot q:task.getResult()) {
                    prod p=new prod(q.getString("name"),q.getString("description"),q.getId(),q.getString("imagelink"));
                    usa.add(p);


                }
                mc=new mcvadapter2(Departments.this,usa);
                rv.setAdapter(mc);
            }
        })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(Departments.this, "problem", Toast.LENGTH_SHORT).show();
                        Log.w("---1---",e.getMessage());
                    }
                });
    }

    private void addTest() {
        Random r = new Random();
        for (int i = 0; i < 1; i++) {

            Map<String, String> data = new HashMap<>();
            data.put("name", "try" + r.nextInt(50));
            data.put("status", "trystatus" + r.nextInt(50));
            /*db.collection("users").add(data)
                    .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                        @Override
                        public void onSuccess(DocumentReference documentReference) {
                            Toast.makeText(Main2Activity.this, "added test data", Toast.LENGTH_SHORT).show();
                        }
                    });*/





            db.collection("users").document(
                    "23WRO1PcfEOQq0vhprVw").collection("user1A").add(data)
                    .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                        @Override
                        public void onSuccess(DocumentReference documentReference) {
                            Toast.makeText(Departments.this, "added test data", Toast.LENGTH_SHORT).show();
                        }
                    });




        }
    }

    private void setupfire() {
        db=FirebaseFirestore.getInstance();
    }

    private void recycler() {
        rv=findViewById(R.id.rrv);
        rv.setHasFixedSize(true);
        rv.setLayoutManager(new LinearLayoutManager(this));

    }

    public void next(String depid) {
        Intent i=new Intent(Departments.this,Dr_profile.class);
        i.putExtra("depid",depid);
        i.putExtra("uid",uid);
        startActivity(i);
    }
}