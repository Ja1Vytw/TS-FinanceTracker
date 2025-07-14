package com.techsanca.finance.controller;

import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.techsanca.finance.model.Transacao;
import com.techsanca.finance.service.TransacaoService;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/exportacao")
public class ExportacaoController {
    @Autowired
    private TransacaoService transacaoService;

    @GetMapping("/csv")
    public ResponseEntity<byte[]> exportarCSV(@RequestParam String inicio, @RequestParam String fim, Authentication authentication) throws Exception {
        String usuarioId = authentication.getName();
        LocalDate start = LocalDate.parse(inicio);
        LocalDate end = LocalDate.parse(fim);
        List<Transacao> transacoes = transacaoService.findByUsuarioIdAndPeriodo(usuarioId, start, end);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        CSVPrinter printer = new CSVPrinter(new OutputStreamWriter(out), CSVFormat.DEFAULT.withHeader("data", "valor", "tipo", "categoriaId", "descricao"));
        for (Transacao t : transacoes) {
            printer.printRecord(t.getData(), t.getValor(), t.getTipo(), t.getCategoriaId(), t.getDescricao());
        }
        printer.flush();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=transacoes.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(out.toByteArray());
    }

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> exportarPDF(@RequestParam String inicio, @RequestParam String fim, Authentication authentication) throws Exception {
        String usuarioId = authentication.getName();
        LocalDate start = LocalDate.parse(inicio);
        LocalDate end = LocalDate.parse(fim);
        List<Transacao> transacoes = transacaoService.findByUsuarioIdAndPeriodo(usuarioId, start, end);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        Document document = new Document(new com.itextpdf.kernel.pdf.PdfDocument(writer));
        document.add(new Paragraph("Relatório de Transações"));
        for (Transacao t : transacoes) {
            document.add(new Paragraph(t.getData() + " | " + t.getValor() + " | " + t.getTipo() + " | " + t.getCategoriaId() + " | " + t.getDescricao()));
        }
        document.close();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=transacoes.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(out.toByteArray());
    }
} 