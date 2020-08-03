package com.example.hospice1;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.DocumentSnapshot;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;

public class mcvadapter3 extends RecyclerView.Adapter<myrvholder> {
    Dr_profile ma;
    ArrayList<prod> uso;

    public mcvadapter3(Dr_profile ma, ArrayList<prod> uso) {
        this.ma = ma;
        this.uso = uso;
    }

    @NonNull
    @Override
    public myrvholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater li= LayoutInflater.from(ma.getBaseContext());
        View v=li.inflate(R.layout.list_item,parent,false);

        return new myrvholder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull myrvholder holder, final int position) {
        holder.un.setText(uso.get(position).getUsername());
        holder.us.setText(uso.get(position).getUstatus());
        Picasso.get().load(uso.get(position).getImage()).into(holder.imageView);

        holder.del.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View view) {
                 delsel(position);
                //ma.next();
            }
        });
    }

    private void delsel(int p) {
        final String uid;

        ma.db.collection("Dr_List").document(uid=(uso.get(p).getUid()).toString()).get().addOnSuccessListener(new OnSuccessListener<DocumentSnapshot>() {
            @Override
            public void onSuccess(DocumentSnapshot documentSnapshot) {
                //Toast.makeText(ma.getContext(), "Delete Successful", Toast.LENGTH_SHORT).show();
                // ma.loadDep(uso.get(p).getUid());
                ma.next(uid);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(ma, "not", Toast.LENGTH_SHORT).show();
                    }
                });
    }

    @Override
    public int getItemCount() {
        return uso.size();
    }
}
