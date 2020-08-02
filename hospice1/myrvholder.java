package com.example.hospice1;

import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

public class myrvholder extends RecyclerView.ViewHolder {
    public TextView un,us;
    public Button del;
    public ImageView imageView;

    public myrvholder(View v){
        super(v);
        un=v.findViewById(R.id.e);
        us=v.findViewById(R.id.textView2);
        del=v.findViewById(R.id.btnn);
        imageView=v.findViewById(R.id.imageView2);

    }

}
