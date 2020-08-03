package com.example.hospice1;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class schedules extends AppCompatActivity {
    ViewGroup layout;
    FirebaseFirestore db = FirebaseFirestore.getInstance();
   // char seats[]={'/','A','A','A','A','A','A','A','/','A','A','A','A','A','A','A','/','A','A','A','A','A','A','A','/'};
      char seats[]=new char[30];


    String seat =
            "AAAAAAA/"
                    + "UUUUAAA/"
                    +"UUUUAAA/"
                    +"UUUUAAA/";


            /*"_UUUUUUAAAAARRRR_/"
            + "_________________/"
            + "UU__AAAARRRRR__RR/"
            + "UU__UUUAAAAAA__AA/"
            + "AA__AAAAAAAAA__AA/"
            + "AA__AARUUUURR__AA/"
            + "UU__UUUA_RRRR__AA/"
            + "AA__AAAA_RRAA__UU/"
            + "AA__AARR_UUUU__RR/"
            + "AA__UUAA_UURR__RR/"
            + "_________________/"
            /+ "UU_AAAAAAAUUUU_RR/"
            + "RR_AAAAAAAAAAA_AA/"
            + "AA_UUAAAAAUUUU_AA/"
            + "AA_AAAAAAUUUUU_AA/"
            + "_________________/";*/

    //List<TextView> seatViewList = new ArrayList<>();
    int seatSize = 100;
    int seatGaping = 10;

    int STATUS_AVAILABLE = 1;
    int STATUS_BOOKED = 2;
    int STATUS_RESERVED = 3;
    String selectedIds = "";
    Map<String, Object> m1=new LinkedHashMap<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_schedules);
        seats[0]='/';
       // seats[1]='A';
        layout = findViewById(R.id.layoutSeat);
        db.collection("/Hospital/EIJCdYbWlVhgNJkgI3VyuljtazS2/Departments/mPZLYUkvVyz1YBnTn7lv/Dr_List/L012qOOVhMadL1sT623r/schedules").get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                int i=1;
                for(DocumentSnapshot q:task.getResult()) {
                    // prod p=new prod(q.getString("name"),q.getString("designation"),q.getId());
                    // usa.add(p);
                     m1 = q.getData();
                }

                for (Map.Entry<String,Object> entry : m1.entrySet()) {
                    //System.out.println("Key = " + entry.getKey() +
                            //", Value = " + entry.getValue());
                    Log.i("1",entry.getKey());
                    if (entry.getValue().equals("1")) {

                        seats[i] = 'U';
                        String it = String.valueOf(i);
                        Toast.makeText(schedules.this,entry.getKey()+it , Toast.LENGTH_SHORT).show();
                        ++i;
                    } else if (entry.getValue().equals("0")) {
                        seats[i] = 'A';
                        String it = String.valueOf(i);
                        Toast.makeText(schedules.this,entry.getKey()+it , Toast.LENGTH_SHORT).show();
                        ++i;
                    }
                }



                // mc=new mcvadapter3(Dr_profile.this,usa);
                // rv.setAdapter(mc);
            }
        })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(schedules.this, "problem", Toast.LENGTH_SHORT).show();
                        Log.w("---1---",e.getMessage());
                    }
                });
        findViewById(R.id.button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                add();
            }
        });


    }

    private void add() {
        LinearLayout layoutSeat = new LinearLayout(this);
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
                layout = new LinearLayout(this);
                layout.setOrientation(LinearLayout.HORIZONTAL);
                layoutSeat.addView(layout);
            } else if (seats[index] == 'U') {
                count++;
                TextView view = new TextView(this);
                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(seatSize, seatSize);
                layoutParams.setMargins(seatGaping, seatGaping, seatGaping, seatGaping);
                view.setLayoutParams(layoutParams);
                view.setPadding(0, 0, 0, 2 * seatGaping);
                view.setId(count);
                view.setGravity(Gravity.CENTER);
                view.setBackgroundResource(R.drawable.booked_img);
                view.setTextColor(Color.WHITE);
                view.setTag(STATUS_BOOKED);
                view.setText("10:00AM");
                view.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 9);
                layout.addView(view);
                //seatViewList.add(view);
                view.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        if ((int) view.getTag() == STATUS_AVAILABLE) {
                            if (selectedIds.contains(view.getId() + ",")) {
                                selectedIds = selectedIds.replace(+view.getId() + ",", "");
                                view.setBackgroundResource(R.drawable.ic_seats_book);
                                //code to book
                                //a.remove(view.getId());
                            } else {
                                selectedIds = selectedIds + view.getId() + ",";
                                view.setBackgroundResource(R.drawable.ic_seats_selected);
                                Toast.makeText(schedules.this, selectedIds, Toast.LENGTH_SHORT).show();
                                // m.put(view.getId(),'U');
                                //seats[view.getId()]='U';
                                // a.add(view.getId());

                            }
                        } else if ((int) view.getTag() == STATUS_BOOKED) {
                            Toast.makeText(schedules.this, "Seat " + view.getId() + " is Booked", Toast.LENGTH_SHORT).show();
                        } else if ((int) view.getTag() == STATUS_RESERVED) {
                            Toast.makeText(schedules.this, "Seat " + view.getId() + " is Reserved", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            } else if (seats[index] == 'A') {
                count++;
                TextView view = new TextView(this);
                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(seatSize, seatSize);
                layoutParams.setMargins(seatGaping, seatGaping, seatGaping, seatGaping);
                view.setLayoutParams(layoutParams);
                view.setPadding(0, 0, 0, 2 * seatGaping);
                view.setId(count);
                view.setGravity(Gravity.CENTER);
                view.setBackgroundResource(R.drawable.ic_seats_book);
                view.setText(count + "");
                view.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 9);
                view.setTextColor(Color.BLACK);
                view.setTag(STATUS_AVAILABLE);
                layout.addView(view);
                //seatViewList.add(view);
                view.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        if ((int) view.getTag() == STATUS_AVAILABLE) {
                            if (selectedIds.contains(view.getId() + ",")) {
                                selectedIds = selectedIds.replace(+view.getId() + ",", "");
                                view.setBackgroundResource(R.drawable.ic_seats_book);
                                //code to book
                                //a.remove(view.getId());
                            } else {
                                selectedIds = selectedIds + view.getId() + ",";
                                view.setBackgroundResource(R.drawable.ic_seats_selected);
                                Toast.makeText(schedules.this, selectedIds, Toast.LENGTH_SHORT).show();
                                // m.put(view.getId(),'U');
                                //seats[view.getId()]='U';
                                // a.add(view.getId());

                            }
                        } else if ((int) view.getTag() == STATUS_BOOKED) {
                            Toast.makeText(schedules.this, "Seat " + view.getId() + " is Booked", Toast.LENGTH_SHORT).show();
                        } else if ((int) view.getTag() == STATUS_RESERVED) {
                            Toast.makeText(schedules.this, "Seat " + view.getId() + " is Reserved", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            } else if (seats[index] == 'R') {
                count++;
                TextView view = new TextView(this);
                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(seatSize, seatSize);
                layoutParams.setMargins(seatGaping, seatGaping, seatGaping, seatGaping);
                view.setLayoutParams(layoutParams);
                view.setPadding(0, 0, 0, 2 * seatGaping);
                view.setId(count);
                view.setGravity(Gravity.CENTER);
                view.setBackgroundResource(R.drawable.ic_seats_reserved);
                view.setText(count + "");
                view.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 9);
                view.setTextColor(Color.WHITE);
                view.setTag(STATUS_RESERVED);
                layout.addView(view);
                //seatViewList.add(view);
                view.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        if ((int) view.getTag() == STATUS_AVAILABLE) {
                            if (selectedIds.contains(view.getId() + ",")) {
                                selectedIds = selectedIds.replace(+view.getId() + ",", "");
                                view.setBackgroundResource(R.drawable.ic_seats_book);
                                //code to book
                                //a.remove(view.getId());
                            } else {
                                selectedIds = selectedIds + view.getId() + ",";
                                view.setBackgroundResource(R.drawable.ic_seats_selected);
                                Toast.makeText(schedules.this, selectedIds, Toast.LENGTH_SHORT).show();
                                // m.put(view.getId(),'U');
                                //seats[view.getId()]='U';
                                // a.add(view.getId());

                            }
                        } else if ((int) view.getTag() == STATUS_BOOKED) {
                            Toast.makeText(schedules.this, "Seat " + view.getId() + " is Booked", Toast.LENGTH_SHORT).show();
                        } else if ((int) view.getTag() == STATUS_RESERVED) {
                            Toast.makeText(schedules.this, "Seat " + view.getId() + " is Reserved", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            } else if (seats[index] == '_') {
                TextView view = new TextView(this);
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
        if ((int) view.getTag() == STATUS_AVAILABLE) {
            if (selectedIds.contains(view.getId() + ",")) {
                selectedIds = selectedIds.replace(+view.getId() + ",", "");
                view.setBackgroundResource(R.drawable.ic_seats_book);
                //code to book
                //a.remove(view.getId());
            } else {
                selectedIds = selectedIds + view.getId() + ",";
                view.setBackgroundResource(R.drawable.ic_seats_selected);
                Toast.makeText(this, selectedIds, Toast.LENGTH_SHORT).show();
               // m.put(view.getId(),'U');
                //seats[view.getId()]='U';
                // a.add(view.getId());

            }
        } else if ((int) view.getTag() == STATUS_BOOKED) {
            Toast.makeText(this, "Seat " + view.getId() + " is Booked", Toast.LENGTH_SHORT).show();
        } else if ((int) view.getTag() == STATUS_RESERVED) {
            Toast.makeText(this, "Seat " + view.getId() + " is Reserved", Toast.LENGTH_SHORT).show();
        }
    }
}