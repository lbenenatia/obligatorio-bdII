package com.mundial2026;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MundialApplication {

    public static void main(String[] args) {
        SpringApplication.run(MundialApplication.class, args);
    }

}
