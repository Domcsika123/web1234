#!/usr/bin/env python3
"""
WebForge Backend Contact API Test Suite
Tests all contact API endpoints with comprehensive scenarios
"""

import requests
import json
import os
from datetime import datetime
import sys

# Get backend URL from frontend .env file
BACKEND_URL = "https://webugynokseg.preview.emergentagent.com/api"

class ContactAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        self.created_contacts = []
        
    def log_result(self, test_name, success, details, expected_status=None, actual_status=None):
        """Log test result with details"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        if expected_status:
            result["expected_status"] = expected_status
        if actual_status:
            result["actual_status"] = actual_status
        
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if not success:
            print(f"   Details: {details}")
        if expected_status and actual_status:
            print(f"   Expected: {expected_status}, Got: {actual_status}")
        print()

    def test_valid_contact_submission(self):
        """Test 1: Valid Contact Submission"""
        test_data = {
            "name": "Anna Kovács",
            "email": "anna.kovacs@example.com",
            "phone": "+36 30 123 4567",
            "budget": "500k-1m",
            "message": "Szeretnék egy modern weboldalt a vállalkozásomnak. Fontos lenne a reszponzív design és a SEO optimalizálás."
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
            
            if response.status_code == 201:
                data = response.json()
                if data.get("success") and data.get("contactId"):
                    self.created_contacts.append(data["contactId"])
                    self.log_result(
                        "Valid Contact Submission", 
                        True, 
                        f"Contact created with ID: {data['contactId']}", 
                        201, 
                        response.status_code
                    )
                else:
                    self.log_result(
                        "Valid Contact Submission", 
                        False, 
                        f"Missing success flag or contactId in response: {data}", 
                        201, 
                        response.status_code
                    )
            else:
                self.log_result(
                    "Valid Contact Submission", 
                    False, 
                    f"Unexpected status code. Response: {response.text}", 
                    201, 
                    response.status_code
                )
                
        except Exception as e:
            self.log_result("Valid Contact Submission", False, f"Request failed: {str(e)}")

    def test_missing_required_fields(self):
        """Test 2: Missing Required Fields (name)"""
        test_data = {
            "email": "test@example.com",
            "message": "This is a test message without name field"
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
            
            if response.status_code in [400, 422]:
                self.log_result(
                    "Missing Required Fields (name)", 
                    True, 
                    f"Correctly rejected missing name field", 
                    "400/422", 
                    response.status_code
                )
            else:
                self.log_result(
                    "Missing Required Fields (name)", 
                    False, 
                    f"Should have rejected missing name. Response: {response.text}", 
                    "400/422", 
                    response.status_code
                )
                
        except Exception as e:
            self.log_result("Missing Required Fields (name)", False, f"Request failed: {str(e)}")

    def test_invalid_email_format(self):
        """Test 3: Invalid Email Format"""
        test_data = {
            "name": "Test User",
            "email": "invalid-email",
            "message": "This is a test message with invalid email format"
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
            
            if response.status_code in [400, 422]:
                self.log_result(
                    "Invalid Email Format", 
                    True, 
                    f"Correctly rejected invalid email format", 
                    "400/422", 
                    response.status_code
                )
            else:
                self.log_result(
                    "Invalid Email Format", 
                    False, 
                    f"Should have rejected invalid email. Response: {response.text}", 
                    "400/422", 
                    response.status_code
                )
                
        except Exception as e:
            self.log_result("Invalid Email Format", False, f"Request failed: {str(e)}")

    def test_message_too_short(self):
        """Test 4: Message Too Short"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Short"
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
            
            if response.status_code in [400, 422]:
                self.log_result(
                    "Message Too Short", 
                    True, 
                    f"Correctly rejected short message", 
                    "400/422", 
                    response.status_code
                )
            else:
                self.log_result(
                    "Message Too Short", 
                    False, 
                    f"Should have rejected short message. Response: {response.text}", 
                    "400/422", 
                    response.status_code
                )
                
        except Exception as e:
            self.log_result("Message Too Short", False, f"Request failed: {str(e)}")

    def test_get_all_contacts(self):
        """Test 5: Get All Contacts"""
        try:
            response = requests.get(f"{self.base_url}/contact/all", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "contacts" in data and "count" in data:
                    contact_count = len(data["contacts"])
                    total_count = data["count"]
                    self.log_result(
                        "Get All Contacts", 
                        True, 
                        f"Retrieved {contact_count} contacts, total count: {total_count}", 
                        200, 
                        response.status_code
                    )
                else:
                    self.log_result(
                        "Get All Contacts", 
                        False, 
                        f"Missing expected fields in response: {data}", 
                        200, 
                        response.status_code
                    )
            else:
                self.log_result(
                    "Get All Contacts", 
                    False, 
                    f"Unexpected status code. Response: {response.text}", 
                    200, 
                    response.status_code
                )
                
        except Exception as e:
            self.log_result("Get All Contacts", False, f"Request failed: {str(e)}")

    def test_database_persistence(self):
        """Test 6: Database Persistence Check"""
        if not self.created_contacts:
            self.log_result("Database Persistence", False, "No contacts were created to verify persistence")
            return
            
        try:
            # Get all contacts and check if our created contact exists
            response = requests.get(f"{self.base_url}/contact/all", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                contacts = data.get("contacts", [])
                
                # Check if any of our created contacts exist in the database
                found_contacts = []
                for contact in contacts:
                    if contact.get("_id") in self.created_contacts:
                        found_contacts.append(contact["_id"])
                
                if found_contacts:
                    self.log_result(
                        "Database Persistence", 
                        True, 
                        f"Found {len(found_contacts)} created contacts in database: {found_contacts}"
                    )
                else:
                    self.log_result(
                        "Database Persistence", 
                        False, 
                        f"Created contacts {self.created_contacts} not found in database"
                    )
            else:
                self.log_result(
                    "Database Persistence", 
                    False, 
                    f"Could not retrieve contacts to verify persistence. Status: {response.status_code}"
                )
                
        except Exception as e:
            self.log_result("Database Persistence", False, f"Database check failed: {str(e)}")

    def test_additional_validation_scenarios(self):
        """Additional validation tests"""
        
        # Test missing email
        test_data = {
            "name": "Test User",
            "message": "This is a test message without email field"
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
            
            if response.status_code in [400, 422]:
                self.log_result(
                    "Missing Required Fields (email)", 
                    True, 
                    f"Correctly rejected missing email field", 
                    "400/422", 
                    response.status_code
                )
            else:
                self.log_result(
                    "Missing Required Fields (email)", 
                    False, 
                    f"Should have rejected missing email. Response: {response.text}", 
                    "400/422", 
                    response.status_code
                )
                
        except Exception as e:
            self.log_result("Missing Required Fields (email)", False, f"Request failed: {str(e)}")

        # Test missing message
        test_data = {
            "name": "Test User",
            "email": "test@example.com"
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
            
            if response.status_code in [400, 422]:
                self.log_result(
                    "Missing Required Fields (message)", 
                    True, 
                    f"Correctly rejected missing message field", 
                    "400/422", 
                    response.status_code
                )
            else:
                self.log_result(
                    "Missing Required Fields (message)", 
                    False, 
                    f"Should have rejected missing message. Response: {response.text}", 
                    "400/422", 
                    response.status_code
                )
                
        except Exception as e:
            self.log_result("Missing Required Fields (message)", False, f"Request failed: {str(e)}")

    def run_all_tests(self):
        """Run all test scenarios"""
        print("=" * 60)
        print("WebForge Backend Contact API Test Suite")
        print("=" * 60)
        print(f"Testing backend URL: {self.base_url}")
        print()
        
        # Run all tests
        self.test_valid_contact_submission()
        self.test_missing_required_fields()
        self.test_invalid_email_format()
        self.test_message_too_short()
        self.test_get_all_contacts()
        self.test_additional_validation_scenarios()
        self.test_database_persistence()
        
        # Summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"❌ {result['test']}: {result['details']}")
        
        print("\n" + "=" * 60)
        return failed_tests == 0

if __name__ == "__main__":
    tester = ContactAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)