/**
 * created by Anna
 * Date:15/12/2024
 * Time:13:02
 * ProjectName:hos
 **/

package com.kfs.kfs.repository;

import com.kfs.kfs.modell.AppintmentModell;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<AppintmentModell, Integer> {
}
