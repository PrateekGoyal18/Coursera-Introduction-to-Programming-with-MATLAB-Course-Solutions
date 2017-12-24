function B = bell(n)
%Input n is a positive integer
%Output B is an array of nxn
%Example B=bell(7)
if n<1 || fix(n)~=n  %check if n is a positive integer
    B=[];
    return;
end
B = zeros(n);
B(1,1) = 1;
for row=2:n
  B(row, 1:row) = B(row-1,row-1) + cumsum([0 B(row-1, 1:row-1)]);
end
A=B(:,1);
count=n-1;
for i=2:n
    C=circshift(B(:,i),count);
    A=[A C];
    count=count-1;
end
B=A;