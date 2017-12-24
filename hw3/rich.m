function total_money=rich(a)
s1=a(1)*0.01;
s2=a(2)*0.05;
s3=a(3)*0.1;
s4=a(4)*0.25;
total_money=s1+s2+s3+s4;  

    

function usd = rich(cent)
usd = [0.01 0.05 0.10 0.25] * cent';
end  

%We use the fact that matrix multiplication sums up a set of products. 
%Multiplying a row vector with a column vector will result in a scalar. 
%Here it performs the exact calculations we need.