package com.example.hospice1.ui.slideshow;
public class prod {
    String username;
    String ustatus;
    String uid;
    String image,cname,cadd;

    public prod(String cname, String username, String ustatus, String cadd, String uid, String  image) {
        this.username = username;
        this.ustatus = ustatus;
        this.image=image;
        this.cname=cname;
        this.cadd=cadd;



        setUid(uid);
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUstatus() {
        return ustatus;
    }

    public void setUstatus(String ustatus) {
        this.ustatus = ustatus;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }



    public String getCadd() {
        return cadd;
    }

    public void setCadd(String cadd) {
        this.cadd = cadd;
    }
}


