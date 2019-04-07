package com.agrimeme.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import com.agrimeme.backend.property.FileStorageProperties;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication()
@EntityScan(basePackageClasses = { 
		SpringbootTest.class,
		Jsr310JpaConverters.class 
})
@EnableConfigurationProperties({
    FileStorageProperties.class
})
public class SpringbootTest {

	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Jakarta"));
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringbootTest.class, args);
	}
}

