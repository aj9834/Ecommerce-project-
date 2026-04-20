package com.infy.ecom_poc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestApi {

    @GetMapping("/test")
    public String test(){
        return "Hi this is for the testing purpose";
    }
}
