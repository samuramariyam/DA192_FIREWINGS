package com.example.hospice1.ui.slideshow;

import android.app.Activity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hospice1.MainActivity2;
import com.example.hospice1.R;
import com.example.hospice1.ui.home.HomeFragment;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.DocumentSnapshot;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;

public class mcvadapter extends RecyclerView.Adapter<myrvholder> {
    SlideshowFragment ma;
    ArrayList<prod> uso;
    Activity co;
    MainActivity2 m2;

    public mcvadapter(SlideshowFragment ma, ArrayList<prod> uso) {
        this.ma = ma;
        this.uso = uso;
    }

    @NonNull
    @Override
    public myrvholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater li= LayoutInflater.from(ma.getContext());
        View v=li.inflate(R.layout.list_item,parent,false);

        return new myrvholder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull myrvholder holder, final int position) {
        holder.un.setText(uso.get(position).getUsername());
        holder.us.setText(uso.get(position).getUstatus());
        Picasso.get().load(uso.get(position).getImage()).into(holder.imageView);
         //Glide.with(ma.getContext())
                //.load(uso.get(position).getImage())
                //.into(holder.imageView);


        holder.del.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View view) {
                delsel(position);

            }
        });
    }

    private void delsel(final int p) {
        final String uid;

        ma.db.collection("Hospital").document(uid=(uso.get(p).getUid()).toString()).get().addOnSuccessListener(new OnSuccessListener<DocumentSnapshot>() {
            @Override
            public void onSuccess(DocumentSnapshot documentSnapshot) {
                //Toast.makeText(ma.getContext(), "Delete Successful", Toast.LENGTH_SHORT).show();
               // ma.loadDep(uso.get(p).getUid());
               // Toast.makeText(co, "hiii", Toast.LENGTH_SHORT).show();
                ma.next(uid);
            }
        })

       /* ma.db.collection("users").document(uso.get(p).getUid()).delete()
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {

                        Toast.makeText(ma.getContext(), "Delete Successful", Toast.LENGTH_SHORT).show();
                        ma.load();
                    }
                })*/
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(ma.getContext(), "not", Toast.LENGTH_SHORT).show();
                    }
                });
    }

    @Override
    public int getItemCount() {
        return uso.size();
    }
}
