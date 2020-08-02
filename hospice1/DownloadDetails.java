package com.example.hospice1;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class DownloadDetails extends AppCompatActivity {
    EditText t1,t2;
    Button download;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_download_details);
        t1=findViewById(R.id.editText1);
        t2=findViewById(R.id.editText2);
        download=findViewById(R.id.button);

        download.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String s=t1.getText().toString();
                String  ss=t2.getText().toString();
                String path=getExternalFilesDir(null).toString()+"/"+s+".pdf";
                File file=new File(path);
                if(!file.exists()){
                    try {
                        file.createNewFile();
                    }catch (IOException e){
                        e.printStackTrace();
                    }
                }

                Document document=new Document(PageSize.A4);
                try {
                    PdfWriter.getInstance(document,new FileOutputStream(file.getAbsoluteFile()));
                }catch (DocumentException e){
                    e.printStackTrace();
                }catch (FileNotFoundException e){
                    e.printStackTrace();
                }
                document.open();
                try {
                    document.add(new Paragraph(s));
                    document.add(new Paragraph("/n"));
                    document.add(new Paragraph(ss));
                }catch (DocumentException e){
                    e.printStackTrace();
                }
                Toast.makeText(DownloadDetails.this, "Downloaded Successfully", Toast.LENGTH_SHORT).show();
                document.close();
            }
        });
    }
}