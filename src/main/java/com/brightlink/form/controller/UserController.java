package com.brightlink.form.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.brightlink.form.entity.User;
import com.brightlink.form.repository.UserRepository;

@Controller
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/form")
    public String showForm(Model model) {
        model.addAttribute("user", new User());
        return "form";
    }
    
    @PostMapping("/submit")
    public String submitForm(@ModelAttribute User user) {
        userRepository.save(user);
        return "redirect:/details";
    }
    
//    @GetMapping("/details")
//    public String showUserDetails(Model model) {
//        List<User> users = userRepository.findAll();
//        model.addAttribute("users", users);
////        model.addAttribute("selectedUser", new User()); // Ensure the modal can bind data
//        return "details";
//    }


    // New method to handle the submission of the edited user
    @PostMapping("/update")
    public String updateUser (@ModelAttribute User user) {
        userRepository.save(user); // Save the updated user
        return "redirect:/details"; // Redirect to the details page
    }
    
    @PostMapping("/delete/{id}")
    public String deleteUser (@PathVariable("id") int id) {
        userRepository.deleteById(id); // Delete the user by ID
        return "redirect:/details"; // Redirect to the details page after deletion
    }
    
    
    @GetMapping("/search")
    public String searchUsers(@RequestParam("query") String query, 
                              @RequestParam(defaultValue = "0") int page, 
                              @RequestParam(defaultValue = "5") int size, 
                              Model model) {
        Page<User> userPage = userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query, PageRequest.of(page, size));

        model.addAttribute("users", userPage.getContent());
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", userPage.getTotalPages());
        model.addAttribute("size", size);
        model.addAttribute("searchQuery", query); // Preserve the search query in the UI

        return "details"; 
    }
    
    
    @GetMapping("/details")
    public String getUsers(Model model, 
                           @RequestParam(defaultValue = "0") int page, 
                           @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userRepository.findAll(pageable);
        
        
        model.addAttribute("users", userPage.getContent());
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", userPage.getTotalPages());
        model.addAttribute("size", size);

        return "details"; // Thymeleaf template name
    }

    
    
    
}