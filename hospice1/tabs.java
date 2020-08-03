package com.example.hospice1;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.appbar.AppBarLayout;
import com.google.android.material.tabs.TabLayout;
import com.google.firebase.Timestamp;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class tabs extends AppCompatActivity {
    private TabLayout tabLayout;
    private AppBarLayout appBarLayout;
    private ViewPager viewPager;
    FirebaseFirestore db = FirebaseFirestore.getInstance();
   private String currentdate;
    private String NxtDate;
    private String toDate;
    public Date d;
    private Date s;
   VpAdapter adapter;
   String uid,depid,drid;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tabs);
        tabLayout=findViewById(R.id.tabbarid);
        appBarLayout=findViewById(R.id.appbarid);
        viewPager=findViewById(R.id.vp);
         adapter=new VpAdapter(getSupportFragmentManager());
         Intent i=getIntent();
         uid=i.getStringExtra("uid");
        depid=i.getStringExtra("depid");
        drid=i.getStringExtra("drid");
           String c= i.getStringExtra("times");
        Toast.makeText(tabs.this,c, Toast.LENGTH_SHORT).show();

        d=new Date();
        load(c);
       /* final SimpleDateFormat dateFormat= new SimpleDateFormat("EEEE dd.MM.yyyy");
        final Calendar currentCal = Calendar.getInstance();
        final String cd=dateFormat.format(currentCal.getTime());
        currentCal.add(Calendar.DATE, 1);
        String NxtDate=dateFormat.format(currentCal.getTime());
        currentCal.add(Calendar.DATE, 1);
        String toDate=dateFormat.format(currentCal.getTime());*/
      /* db.collection("/Hospital/EIJCdYbWlVhgNJkgI3VyuljtazS2/Departments/mPZLYUkvVyz1YBnTn7lv/Dr_List/fEFisKYF8ZpKv9oXFcCB/schedules/asun/slots/").get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
           @Override
           public void onComplete(@NonNull Task<QuerySnapshot> task) {
               for(DocumentSnapshot q:task.getResult()) {

                   s = q.getDate("currentDate");
                   c = s.toString().substring(0,10);
                   int a=   q.getDate("currentDate").compareTo(d);




                   Toast.makeText(tabs.this,, Toast.LENGTH_SHORT).show();

                   //currentdate = q.getTimestamp("currentDate");
                   //toDate=currentdate.toString();

                   //toDate=
                  // break;
                   //NxtDate=currentdate+1;
                   //oDate=currentdate+2;
               }

           }
       });*/



    }
    public void load(String cs){
        adapter.AddFragment(new FragmentMonday(uid,depid,drid),"MON");
        adapter.AddFragment(new FragmentTuesday(uid,depid,drid),"TUE");
        adapter.AddFragment(new FragmentWednesday(uid,depid,drid),"WED");

        //adapter setup
        viewPager.setAdapter(adapter);
        tabLayout.setupWithViewPager(viewPager);
    }
}