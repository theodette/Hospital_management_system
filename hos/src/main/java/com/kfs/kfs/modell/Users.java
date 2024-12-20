/**
 * created by Anna
 * Date:12/12/2024
 * Time:09:39
 * ProjectName:login
 **/

package com.kfs.kfs.modell;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private String email;
    private String passaword;
    private String role;

    public Users(int id) {
        this.id = id;
    }

    public Users() {
    }

    public String getPassaword() {
        return passaword;
    }

    public void setPassaword(String passaword) {
        this.passaword = passaword;
    }

    public Users(int id, String email, String passaword, String role) {
        this.id = id;
        this.email = email;
        this.passaword = passaword;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
