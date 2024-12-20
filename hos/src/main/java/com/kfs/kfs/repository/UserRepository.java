/**
 * created by Anna
 * Date:12/12/2024
 * Time:11:57
 * ProjectName:kfsbackend
 **/

package com.kfs.kfs.repository;
import com.kfs.kfs.modell.Users;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);
}
