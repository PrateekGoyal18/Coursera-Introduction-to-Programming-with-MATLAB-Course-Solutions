function result = myprime(n)  
result=true;
%% check if number is a nonnegative integer 
if floor(n)~=n || n<0 
    result=false; 
    return
end 
%% check if number can be divided by another integer 
for k=2:(n/2) 
    if rem(n,k)==0 
        result=false; 
        return 
    end
end