/**
 * created by Anna
 * Date:15/12/2024
 * Time:13:01
 * ProjectName:hos
 **/

package com.kfs.kfs.modell;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import java.sql.Time;
import java.util.Date;

@Entity
public class AppintmentModell {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String insurance;
    private String doctor;
    private String service;
    private Date date;
    private Time time;


    public AppintmentModell() {
    }



    public AppintmentModell(int id, String name, String insurance, String doctor, String service, Date date, Time time) {
        this.id = id;
        this.name = name;
        this.insurance = insurance;
        this.doctor = doctor;
        this.service = service;
        this.date = date;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInsurance() {
        return insurance;
    }

    public void setInsurance(String insurance) {
        this.insurance = insurance;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
