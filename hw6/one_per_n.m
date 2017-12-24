function n = one_per_n(x)
%Input x is a scalar
%Output n is a positive integer
%Example: n = one_per_n(4)
%         n = 31
sum=0;
n=0;
while sum<x
    if n<10000
        n=n+1;
        sum=sum+1/n;
    else
        n=-1;
        return;
    end
end