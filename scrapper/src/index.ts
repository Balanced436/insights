import { Builder, Browser, By, Key, until, WebDriver } from 'selenium-webdriver';

abstract class Scrapper{
    url: string;
    driver: WebDriver;

    constructor(url: string, driver : WebDriver){
        this.driver =  driver
        this.driver.get(url)
        this.url = url
    }

    abstract listVideos(): any


    close(){
        this.driver.close
    }
    
}