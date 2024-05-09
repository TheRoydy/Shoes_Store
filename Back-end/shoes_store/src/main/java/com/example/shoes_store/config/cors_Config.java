package com.example.shoes_store.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class cors_Config {

    @Bean
	public CorsFilter corsFilter () {
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		
		
		config.addAllowedOrigin("http://127.0.0.1:5500/");
		config.addAllowedOrigin("http://localhost:5500/");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("DELETE");
		
		config.addAllowedHeader("Authorization");
		config.addAllowedHeader("Content-Type");
		
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}
    
}
