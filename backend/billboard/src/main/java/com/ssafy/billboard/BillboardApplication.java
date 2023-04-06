package com.ssafy.billboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BillboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillboardApplication.class, args);
	}

}
