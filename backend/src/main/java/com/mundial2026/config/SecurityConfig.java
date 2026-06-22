package com.mundial2026.config;

import com.mundial2026.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()

                // Estadio: gestion solo ADMINISTRADOR
                .requestMatchers(HttpMethod.POST, "/estadios/**").hasRole("ADMINISTRADOR")
                .requestMatchers(HttpMethod.PUT, "/estadios/**").hasRole("ADMINISTRADOR")
                .requestMatchers(HttpMethod.DELETE, "/estadios/**").hasRole("ADMINISTRADOR")

                // Evento: crear/editar/eliminar/aprobar/cancelar solo ADMINISTRADOR
                .requestMatchers(HttpMethod.POST, "/eventos").hasRole("ADMINISTRADOR")
                .requestMatchers(HttpMethod.PUT, "/eventos/**").hasRole("ADMINISTRADOR")
                .requestMatchers(HttpMethod.DELETE, "/eventos/**").hasRole("ADMINISTRADOR")
                .requestMatchers(HttpMethod.POST, "/eventos/*/aprobar", "/eventos/*/cancelar").hasRole("ADMINISTRADOR")

                // QR: generar/ver es del espectador dueño de la entrada; validar es del funcionario en puerta
                .requestMatchers(HttpMethod.POST, "/qr/generar/**").hasRole("GENERAL")
                .requestMatchers(HttpMethod.GET, "/qr/*/imagen").hasRole("GENERAL")
                .requestMatchers(HttpMethod.POST, "/qr/*/validar").hasRole("FUNCIONARIO")

                // Compra: crear/confirmar/pagar lo hace el espectador comprador; listar todas es admin
                .requestMatchers(HttpMethod.POST, "/compras").hasRole("GENERAL")
                .requestMatchers(HttpMethod.POST, "/compras/*/confirmar", "/compras/*/pagar").hasRole("GENERAL")
                .requestMatchers(HttpMethod.GET, "/compras").hasRole("ADMINISTRADOR")

                // Transferencia: crearla es del espectador remitente; listarlas todas es admin
                .requestMatchers(HttpMethod.POST, "/transferencias").hasRole("GENERAL")
                .requestMatchers(HttpMethod.GET, "/transferencias").hasRole("ADMINISTRADOR")

                // Usuarios: buscar (para transferir) es de cualquier autenticado; contar es admin
                .requestMatchers(HttpMethod.GET, "/usuarios/count").hasRole("ADMINISTRADOR")

                // Entradas validadas por el funcionario logueado
                .requestMatchers(HttpMethod.GET, "/entradas/validadas/mias").hasRole("FUNCIONARIO")

                // Funcionario: ver su propia asignacion (sector/evento/dispositivo) es del propio funcionario;
                // asignar sector/dispositivo a un funcionario es solo del admin
                .requestMatchers(HttpMethod.GET, "/funcionarios/mi-sector", "/funcionarios/mi-evento", "/funcionarios/mi-dispositivo").hasRole("FUNCIONARIO")
                .requestMatchers(HttpMethod.POST, "/funcionarios/*/sectores/*", "/funcionarios/*/dispositivo").hasRole("ADMINISTRADOR")
                .requestMatchers(HttpMethod.DELETE, "/funcionarios/*/sectores/*", "/funcionarios/*/dispositivo").hasRole("ADMINISTRADOR")

                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    public String getJwtSecret() {
        return jwtSecret;
    }

    public long getJwtExpiration() {
        return jwtExpiration;
    }
}
