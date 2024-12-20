/**
 * created by Anna
 * Date:15/12/2024
 * Time:14:41
 * ProjectName:hos
 **/

package com.kfs.kfs.modell;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class DoctorsMo {
    @Id
    private int id;
    private String dName;
    private String serviceN;


    public DoctorsMo(int id, String dName, String serviceN) {
        this.id = id;
        this.dName = dName;
        this.serviceN = serviceN;
    }

    public DoctorsMo() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getdName() {
        return dName;
    }

    public void setdName(String dName) {
        this.dName = dName;
    }

    public String getServiceN() {
        return serviceN;
    }

    public void setServiceN(String serviceN) {
        this.serviceN = serviceN;
    }
}
