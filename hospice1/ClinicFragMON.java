package com.example.hospice1;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;


import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

import static android.content.ContentValues.TAG;

public class ClinicFragMON extends Fragment implements View.OnClickListener {
    View v;
    Button b;
    int id=0,selected=0;
    ViewGroup layout;
    String stat[]=new String[100];
    FirebaseFirestore db = FirebaseFirestore.getInstance();
    // char seats[]={'/','A','A','A','A','A','A','A','/','A','A','A','A','A','A','A','/','A','A','A','A','A','A','A','/'};
    char seats[]=new char[30];
    int seatSize = 100;
    int seatGaping = 10;

    int STATUS_AVAILABLE = 1;
    int STATUS_BOOKED = 2;
    int STATUS_RESERVED = 3;
    String selectedIds = "";
    Map<String, Object> m=new LinkedHashMap<>();
    TreeMap<String, Object> sorted = new TreeMap<>();
    FragmentWednesday fd;
    DocumentReference docRef;
    private Date s;
    private String c;
    TextView tt;
    private Date d;
    int a;
    String uid,depid,drid,day;

    public ClinicFragMON(String uid,String depid,String drid) {
        this.uid=uid;
        this.depid=depid;
        this.drid=drid;

    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        v = inflater.inflate(R.layout.mon_fragment,container,false);
        //super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_schedules);
        seats[0]='/';
        // seats[1]='A';
        v.findViewById(R.id.button3).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i=new Intent(getActivity(),Gp.class);
                //i.putExtra("ref","/Hospital/EIJCdYbWlVhgNJkgI3VyuljtazS2/Departments/mPZLYUkvVyz1YBnTn7lv/Dr_List/fEFisKYF8ZpKv9oXFcCB/schedules/asun/slots/");
                //  i.putExtra("id",stat[selected]);
                startActivity(i);
            }
        });
        layout = v.findViewById(R.id.layoutSeat);
        //s=new Date();
        d=new Date();

        // docRef = db.collection("/Hospital/EIJCdYbWlVhgNJkgI3VyuljtazS2/Departments/mPZLYUkvVyz1YBnTn7lv/Dr_List/L012qOOVhMadL1sT623r/schedules").document("/asun/slots");

        /*docRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot document = task.getResult();
                    int i=1;
                    if (document.exists())  {
                       // Log.d(TAG, "DocumentSnapshot data: " + document.getData());
                        m=document.getData();

                        sorted.putAll(m);
                        //for (Map.Entry<String,Object> entry : m.entrySet()) {
                        for (Map.Entry<String, Object> entry : sorted.entrySet()){
                                                    //System.out.println("Key = " + entry.getKey() +
                            //", Value = " + entry.getValue());
                            Log.i("1",entry.getKey());
                            if (entry.getValue().equals("1")) {

                                seats[i] = 'U';
                                String it = String.valueOf(i);
                                //Toast.makeText(getActivity(),entry.getKey()+it , Toast.LENGTH_SHORT).show();
                                ++i;
                            } else if (entry.getValue().equals("0")) {
                                seats[i] = 'A';
                                String it = String.valueOf(i);
                                //Toast.makeText(getActivity(),entry.getKey()+it , Toast.LENGTH_SHORT).show();
                                ++i;
                            }
                        }
                    } else {
                        Log.i(TAG, "No such document");
                    }

                } else {
                    Log.d(TAG, "get failed with ", task.getException());
                }
            }
        });*/


        db.collection("/Hospital/"+uid+"/Departments/"+depid+"/Dr_List/"+drid+"/schedules/bmon/slots").orderBy("index").get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                int i=1;
                for(DocumentSnapshot q:task.getResult()) {
                    s = q.getDate("currentDate");
                    c = s.toString().substring(0,10);
                    tt=v.findViewById(R.id.da);
                    tt.setText(c);

                    a = q.getDate("currentDate").compareTo(d);
                    if(q.getString("status").equals("1")){

                        seats[i] = 'U';
                        String it = String.valueOf(i);
                        stat[i]=q.getId();
                        //Toast.makeText(getActivity(),q.getId(), Toast.LENGTH_SHORT).show();
                        ++i;
                    } else if (q.getString("status").equals("0")) {
                        seats[i] = 'A';
                        String it = String.valueOf(i);
                        stat[i]=q.getId();
                        //Toast.makeText(getActivity(),entry.getKey()+it , Toast.LENGTH_SHORT).show();
                        ++i;
                    }
                    // prod p=new prod(q.getString("name"),q.getString("designation"),q.getId());
                    // usa.add(p);
                    // m = q.getData();
                }

             /*   for (Map.Entry<String,Object> entry : m.entrySet()) {
                    //System.out.println("Key = " + entry.getKey() +
                    //", Value = " + entry.getValue());
                    Log.i("1",entry.getKey());
                    if (entry.getValue().equals("1")) {

                        seats[i] = 'U';
                        String it = String.valueOf(i);
                        //Toast.makeText(getActivity(),entry.getKey()+it , Toast.LENGTH_SHORT).show();
                        ++i;
                    } else if (entry.getValue().equals("0")) {
                        seats[i] = 'A';
                        String it = String.valueOf(i);
                        //Toast.makeText(getActivity(),entry.getKey()+it , Toast.LENGTH_SHORT).show();
                        ++i;
                    }
                }*/



                // mc=new mcvadapter3(Dr_profile.this,usa);
                // rv.setAdapter(mc);
            }
        })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(getActivity(), "problem", Toast.LENGTH_SHORT).show();
                        Log.w("---1---",e.getMessage());
                    }
                });
        //findViewById(R.id.button).setOnClickListener(new View.OnClickListener() {
        //@Override
        // public void onClick(View view) {
        if(a>=0){


            add();
            Toast.makeText(getActivity(), "add", Toast.LENGTH_SHORT).show();
        }else{
            Toast.makeText(getActivity(), "PLEASE CHECK THE DATE", Toast.LENGTH_SHORT).show();
        }
        //}
        //});



        return v;
    }

    private void add() {
        LinearLayout layoutSeat = new LinearLayout(getActivity());
        // LinearLayout layoutSeat = new LinearLayout(this);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        layoutSeat.setOrientation(LinearLayout.VERTICAL);
        layoutSeat.setLayoutParams(params);
        layoutSeat.setPadding(8 * seatGaping, 8 * seatGaping, 8 * seatGaping, 8 * seatGaping);
        layout.addView(layoutSeat);

        LinearLayout layout = null;

        int count = 0;

        for (int index = 0; index < seats.length; index++) {

            if (seats[index] == '/') {
                layout = new LinearLayout(getActivity());
                layout.setOrientation(LinearLayout.HORIZONTAL);
                layoutSeat.addView(layout);
            } else if (seats[index] == 'U') {
                count++;
                TextView view = new TextView(getActivity());
                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(seatSize, seatSize);
                layoutParams.setMargins(seatGaping, seatGaping, seatGaping, seatGaping);
                view.setLayoutParams(layoutParams);
                view.setPadding(0, 0, 0, 2 * seatGaping);
                view.setId(count);
                view.setGravity(Gravity.CENTER);
                view.setBackgroundResource(R.drawable.booked_img);
                view.setTextColor(Color.WHITE);
                view.setTag(STATUS_BOOKED);
                view.setText(stat[count]);
                view.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 9);
                layout.addView(view);
                //seatViewList.add(view);
                view.setOnClickListener( this);
            } else if (seats[index] == 'A') {
                count++;
                TextView view = new TextView(getActivity());
                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(seatSize, seatSize);
                layoutParams.setMargins(seatGaping, seatGaping, seatGaping, seatGaping);
                view.setLayoutParams(layoutParams);
                view.setPadding(0, 0, 0, 2 * seatGaping);
                view.setId(count);
                view.setGravity(Gravity.CENTER);
                view.setBackgroundResource(R.drawable.available_img);
                //view.setText();
                view.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 9);
                view.setTextColor(Color.BLACK);
                view.setText(stat[count]);
                view.setTag(STATUS_AVAILABLE);
                layout.addView(view);
                //seatViewList.add(view);
                view.setOnClickListener( this);
            } else if (seats[index] == 'R') {
                count++;
                TextView view = new TextView(getActivity());
                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(seatSize, seatSize);
                layoutParams.setMargins(seatGaping, seatGaping, seatGaping, seatGaping);
                view.setLayoutParams(layoutParams);
                view.setPadding(0, 0, 0, 2 * seatGaping);
                view.setId(count);
                view.setGravity(Gravity.CENTER);
                view.setBackgroundResource(R.drawable.ic_seats_reserved);
                view.setText(stat[count]);
                view.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 9);
                view.setTextColor(Color.WHITE);
                view.setTag(STATUS_RESERVED);
                layout.addView(view);
                //seatViewList.add(view);
                view.setOnClickListener( this);

            } else if (seats[index] == '_') {
                TextView view = new TextView(getActivity());
                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(seatSize, seatSize);
                layoutParams.setMargins(seatGaping, seatGaping, seatGaping, seatGaping);
                view.setLayoutParams(layoutParams);
                view.setBackgroundColor(Color.TRANSPARENT);
                view.setText("");
                layout.addView(view);
            }
        }
    }

    public void onClick(View view) {
        //id=view.getId();
        if (((int)(view.getTag()) == STATUS_AVAILABLE && selected==0)) {
            //docRef=db.collection("/Hospital/EIJCdYbWlVhgNJkgI3VyuljtazS2/Departments/mPZLYUkvVyz1YBnTn7lv/Dr_List/fEFisKYF8ZpKv9oXFcCB/schedules/asun/slots/").document(stat[view.getId()]);
            //.update("status","1");
            view.setBackgroundResource(R.drawable.ic_seats_selected);
            selected=view.getId();
        }
        else if (selected==view.getId()){
            view.setBackgroundResource(R.drawable.available_img);
            selected=0;
        }else if(selected!=0 && (int) view.getTag() != STATUS_BOOKED){
            Toast.makeText(getActivity(), "Alrady one selected", Toast.LENGTH_SHORT).show();}


   /* public void onClick(View view) {
        if ((int) view.getTag() == STATUS_AVAILABLE) {
            if (selectedIds.contains(view.getId() + ",")) {
                selectedIds = selectedIds.replace(+view.getId() + ",", "");
                view.setBackgroundResource(R.drawable.ic_seats_book);
                //code to book
                //a.remove(view.getId());
            } else {
                selectedIds = selectedIds + view.getId() + ",";
                view.setBackgroundResource(R.drawable.ic_seats_selected);
                Toast.makeText(getActivity(), selectedIds, Toast.LENGTH_SHORT).show();
                // m.put(view.getId(),'U');
                //seats[view.getId()]='U';
                // a.add(view.getId());

            }
        }*/ else if ((int) view.getTag() == STATUS_BOOKED) {
            Toast.makeText(getActivity(), "Seat " + view.getId() + " is Booked", Toast.LENGTH_SHORT).show();
        } else if ((int) view.getTag() == STATUS_RESERVED) {
            Toast.makeText(getActivity(), "Seat " + view.getId() + " is Reserved", Toast.LENGTH_SHORT).show();
        }
    }



}