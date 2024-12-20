/**
 * created by Anna
 * Date:15/12/2024
 * Time:13:00
 * ProjectName:hos
 **/

package com.kfs.kfs.controller;

import com.kfs.kfs.modell.AppintmentModell;
import com.kfs.kfs.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {
    @Autowired
    private AppointmentRepository repository;

    @PostMapping("/saveAppointment")
    AppintmentModell newAppintment(@RequestBody AppintmentModell newAppintment){
        return repository.save(newAppintment);
    }
    @GetMapping("/listAppointment")
    List<AppintmentModell> getAppointment(){
        return repository.findAll();
    }
}
