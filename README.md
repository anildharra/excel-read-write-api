# excel-read-write-api
# project set up and execution steps are mentioned in "How to set up and execute the project.docx"

# REQUIREMENTS:
The assignment is to develop an application using Nodejs script that exposes an endpoint to accept an xls file (e.g.: EWNworkstreamAutomationInput.xls) and create an output xls file (e.g EWNworkstreamAutomationOutput) locally. Please refer to the attached files. 

Note:
The output file should have a new column of Rules that are made based on "Required tasks" in the input xls. (Refer to the examples in EWNworkstreamAutomationOutput.xls to arrive at the conversion logic)

The "Required Tasks" will have data in the following format:
testcode1,testcode2    which means testcode1 AND testcode2
testcode1|testcode2    which means testcode1 OR testcode2
testcode1&testcode2|testcode3  which means testcode1 AND testcode2 OR testcode3
testcode1&(testcode2|testcode3) which means testcode1 AND (testcode2 OR testcode3)