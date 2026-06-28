package com.mundial2026.service;

import com.mundial2026.entity.Dispositivo;
import com.mundial2026.entity.Entrada;
import com.mundial2026.entity.usuario.Funcionario;
import com.mundial2026.repository.DispositivoRepository;
import com.mundial2026.repository.EntradaRepository;
import com.mundial2026.repository.FuncionarioRepository;
import com.mundial2026.exception.DispositivoNoAutorizadoException;
import com.mundial2026.exception.InvalidOperationException;
import com.mundial2026.exception.ResourceNotFoundException;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;

@Service
public class QRService {

    @Autowired
    private EntradaRepository entradaRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private DispositivoRepository dispositivoRepository;

    public Entrada generarQR(Integer entradaId) {
        Entrada entrada = entradaRepository.findById(entradaId)
                .orElseThrow(() -> new ResourceNotFoundException("Entrada no encontrada"));

        entrada.setCodigoQR(generarCodigoUnico(entrada));
        entrada.setFechaGeneracionQR(LocalDateTime.now());

        return entradaRepository.save(entrada);
    }

    public String obtenerImagenQR(Integer entradaId) throws Exception {
        Entrada entrada = entradaRepository.findById(entradaId)
                .orElseThrow(() -> new ResourceNotFoundException("Entrada no encontrada"));

        if (Boolean.TRUE.equals(entrada.getConsumida())) {
            throw new RuntimeException("Esta entrada ya fue consumida");
        }

        return generarImagenQRBase64(entrada.getCodigoQR());
    }

    public Entrada consumirQR(String codigoQR, String funcionarioEmail, String nroVinculacion) {
        Entrada entrada = entradaRepository.findByCodigoQR(codigoQR)
                .orElseThrow(() -> new ResourceNotFoundException("QR no encontrado"));

        if (Boolean.TRUE.equals(entrada.getConsumida())) {
            throw new InvalidOperationException("Esta entrada ya fue consumida");
        }

        Funcionario funcionario = funcionarioRepository.findByEmail(funcionarioEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Funcionario no encontrado"));

        Dispositivo dispositivo = dispositivoRepository.findByNroVinculacion(nroVinculacion).orElse(null);
        boolean dispositivoValido = dispositivo != null
                && Boolean.TRUE.equals(dispositivo.getAutorizado())
                && dispositivo.getFuncionario() != null
                && dispositivo.getFuncionario().getId().equals(funcionario.getId());
        if (!dispositivoValido) {
            throw new DispositivoNoAutorizadoException("El dispositivo no está autorizado para este funcionario");
        }

        entrada.setConsumida(true);
        entrada.setFechaConsumo(LocalDateTime.now());
        entrada.setEstado("CONSUMIDA");
        entrada.setValidadoPor(funcionario);

        return entradaRepository.save(entrada);
    }

    private String generarCodigoUnico(Entrada entrada) {
        return entrada.getId() + "-"
                + entrada.getEvento().getId() + "-"
                + entrada.getSector().getCodigo()
                + "-" + UUID.randomUUID().toString();
    }

    private String generarImagenQRBase64(String codigoQR) throws Exception {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(codigoQR, BarcodeFormat.QR_CODE, 300, 300);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

        byte[] qrImageBytes = outputStream.toByteArray();
        return Base64.getEncoder().encodeToString(qrImageBytes);
    }
}
