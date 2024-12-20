/**
 * created by Anna
 * Date:18/12/2024
 * Time:00:40
 * ProjectName:hos
 **/

package com.kfs.kfs.modell;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;

@Entity
public class ServiceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

}
