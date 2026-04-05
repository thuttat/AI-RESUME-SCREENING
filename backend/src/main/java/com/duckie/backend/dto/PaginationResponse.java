package com.duckie.backend.dto;


import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaginationResponse<T> {
    private List<T> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}