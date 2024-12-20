/**
 * created by Anna
 * Date:12/12/2024
 * Time:12:26
 * ProjectName:kfsbackend
 **/

package com.kfs.kfs.controller;

import com.kfs.kfs.repository.UserMesssasgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.kfs.kfs.modell.UserMessage;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserMessageController {
    @Autowired
    private UserMesssasgeRepository userMesssasgeRepository;
    @PostMapping("/message")
    UserMessage newMessage(@RequestBody UserMessage newMessage){
        return userMesssasgeRepository.save(newMessage);
    }

    @GetMapping("/allMessages")
    List<UserMessage> getAllMessage(){
        return userMesssasgeRepository.findAll();
    }
}
