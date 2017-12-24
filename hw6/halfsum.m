function sum=halfsum(v)
%Input v is 2-D matrix
%Output sum is a value
%Example: v = [1 2 3;4 5 6;7 8 9]
%         sum = halfsum(v)
%         sum = 26
sum=0;
[m,n]=size(v);
for i=1:m
    for j=1:n
        if i<=j   %sum of elements with row index <= column index
            sum=sum+v(i,j);
        end
    end
end