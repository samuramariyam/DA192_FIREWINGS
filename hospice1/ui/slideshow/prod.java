package com.example.hospice1.ui.slideshow;
public class prod {
    String username;
    String ustatus;
    String uid;
    String image;

    public prod(String username, String ustatus, String uid,String  image) {
        this.username = username;
        this.ustatus = ustatus;
        this.image=image;
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
}


