package com.example.hospice1;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;

public class profile extends AppCompatActivity {
   String dr,id;
    FirebaseFirestore db = FirebaseFirestore.getInstance();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        Intent i=getIntent();
        id=i.getStringExtra("id");
        dr=i.getStringExtra("ref");
        Toast.makeText(this, id, Toast.LENGTH_SHORT).show();
        Toast.makeText(this, dr, Toast.LENGTH_SHORT).show();

        findViewById(R.id.logout).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               // FirebaseAuth.getInstance().signOut();
               // Intent intent = new Intent(profile.this, MainActivity.class);
               // intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
               // startActivity(intent);
             db.collection(dr).document(id).update("status","1");
             Intent ii=new Intent(profile.this,tabs.class);
                //ii.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
             startActivity(ii);
            }
        });
    }
}