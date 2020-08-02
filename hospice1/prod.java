package com.example.hospice1;
public class prod {
    String username;
    String ustatus;
    String uid;
    String image;

    public prod(String username, String ustatus, String uid,String  image) {
        this.username = username;
        this.ustatus = ustatus;
        setUid(uid);
        this.image=image;
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
}


