/**
 * created by Anna
 * Date:12/12/2024
 * Time:11:57
 * ProjectName:kfsbackend
 **/

package com.kfs.kfs.repository;
import com.kfs.kfs.modell.UserMessage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMesssasgeRepository extends JpaRepository<UserMessage, Integer> {

}
