package com.techsanca.finance.service;

import com.techsanca.finance.model.Alerta;
import com.techsanca.finance.repository.AlertaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlertaService {
    @Autowired
    private AlertaRepository alertaRepository;

    public Alerta save(Alerta alerta) {
        return alertaRepository.save(alerta);
    }

    public List<Alerta> findByUsuarioId(String usuarioId) {
        return alertaRepository.findByUsuarioId(usuarioId);
    }

    public void deleteById(String id) {
        alertaRepository.deleteById(id);
    }
} 