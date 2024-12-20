/**
 * created by Anna
 * Date:15/12/2024
 * Time:14:41
 * ProjectName:hos
 **/

package com.kfs.kfs.controller;

import com.kfs.kfs.modell.DoctorsMo;
import com.kfs.kfs.repository.DoctorsRe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class DoctorsCo {
    @Autowired
    private DoctorsRe doctorsRe;

    // Save a new doctor
    @PostMapping("/saveDoctor")
    DoctorsMo newModell(@RequestBody DoctorsMo newModell) {
        return doctorsRe.save(newModell);
    }

    // Get all doctors
    @GetMapping("/allDoctors")
    List<DoctorsMo> allDoct() {
        return doctorsRe.findAll();
    }

    // Update an existing doctor
    @PutMapping("/updateDoctor/{id}")
    DoctorsMo updateDoctor(@PathVariable int id, @RequestBody DoctorsMo updatedDoctor) {
        Optional<DoctorsMo> doctorOptional = doctorsRe.findById(id);

        if (doctorOptional.isPresent()) {
            DoctorsMo existingDoctor = doctorOptional.get();
            existingDoctor.setdName(updatedDoctor.getdName());
            existingDoctor.setServiceN(updatedDoctor.getServiceN());
            return doctorsRe.save(existingDoctor);
        } else {
            throw new RuntimeException("Doctor with ID " + id + " not found.");
        }
    }

    // Delete a doctor by ID
    @DeleteMapping("/deleteDoctor/{id}")
    String deleteDoctor(@PathVariable int id) {
        if (doctorsRe.existsById(id)) {
            doctorsRe.deleteById(id);
            return "Doctor with ID " + id + " deleted successfully.";
        } else {
            throw new RuntimeException("Doctor with ID " + id + " not found.");
        }
    }
}
