# excel-read-write-api
# project set up and execution steps are mentioned in "How to set up and execute the project.docx"

# REQUIREMENTS:
The assignment is to develop an application using Nodejs script that exposes an endpoint to accept an xlsx file (e.g.: EWNworkstreamAutomationInput.xlsx) and create an output xls file (e.g EWNworkstreamAutomationOutput.xlsx) locally. 
EWNworkstreamAutomationInput.xlsx is avaialble in the root directory of the project.
Note:
The output file should have a new column of Rules that are made based on "Required tasks" in the input xlsx. 

The "Required Tasks" will have data in the following format:
testcode1,testcode2    which means testcode1 AND testcode2
testcode1|testcode2    which means testcode1 OR testcode2
testcode1&testcode2|testcode3  which means testcode1 AND testcode2 OR testcode3
testcode1&(testcode2|testcode3) which means testcode1 AND (testcode2 OR testcode3)