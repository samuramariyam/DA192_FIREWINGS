package com.example.hospice1;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

public class MainActivity extends AppCompatActivity {
    public EditText name,email;
    FirebaseFirestore db = FirebaseFirestore.getInstance();
    String s;
    public EditText editTextMobile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editTextMobile = findViewById(R.id.editTextMobile);
        name=findViewById(R.id.name);
        email=findViewById(R.id.email);

        findViewById(R.id.buttonContinue).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                final String mobile = editTextMobile.getText().toString().trim();
                final String na=name.getText().toString();
                final String em=email.getText().toString();

                if(mobile.isEmpty() || mobile.length() < 10){
                    editTextMobile.setError("Enter a valid mobile");
                    editTextMobile.requestFocus();
                    return;
                }

                db.collection("users").document(mobile).get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                        if(task.getResult().exists()){
                            Toast.makeText(MainActivity.this, "Already Registerd\n Please Login", Toast.LENGTH_SHORT).show();

                        }
                        else{


                            Intent intent = new Intent(MainActivity.this, VerifyPhoneActivity.class);
                            intent.putExtra("mobile", mobile);
                            intent.putExtra("name",na);
                            intent.putExtra("email",em);

                            startActivity(intent);
                        }
                    }
                });






            }

        });
    }

    public void login(View v){
        Intent intent = new Intent(MainActivity.this,login.class);
        startActivity(intent);
    }

    @Override
    protected void onStart() {
        super.onStart();
        if (FirebaseAuth.getInstance().getCurrentUser() !=null){
            Intent intent = new Intent(this, MainActivity2.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
        }
    }
}
