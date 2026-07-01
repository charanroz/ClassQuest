package com.charan.classquest.repository;

import com.charan.classquest.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);

}
