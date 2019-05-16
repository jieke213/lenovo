package com.sunits.lenovo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;

/**
 * @Author WangJingjie
 * @Date 2019/5/16
 * @Description
 */
@SpringBootApplication
@EnableCaching
@MapperScan("com.sunits.lenovo.core.mapper")
@ComponentScan(basePackages = {"com.sunits.lenovo"})
public class LenovoApplication {

    public static void main(String[] args) {
        SpringApplication.run(LenovoApplication.class,args);
    }
}
