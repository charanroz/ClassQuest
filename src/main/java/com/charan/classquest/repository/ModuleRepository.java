package com.charan.classquest.repository;
import com.charan.classquest.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ModuleRepository extends JpaRepository<Module,Long> {

    Optional<Module> findByModuleCode(String moduleCode);
}
