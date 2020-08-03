package com.example.hospice1.ui.slideshow;

import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.hospice1.R;

public class myrvholder extends RecyclerView.ViewHolder {
    public TextView un,us,cn,spl,cadd;
    public Button del;
    public ImageView imageView;

    public myrvholder(View v){
        super(v);

        cn=v.findViewById(R.id.e);
        un=v.findViewById(R.id.textView2);
        us=v.findViewById(R.id.textView3);
        //spl=v.findViewById(R.id.textView4);
        cadd=v.findViewById(R.id.textView5);
        del=v.findViewById(R.id.btnn);
        imageView=v.findViewById(R.id.imageView2);


    }

}
