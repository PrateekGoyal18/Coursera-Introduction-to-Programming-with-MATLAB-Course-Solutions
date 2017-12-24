function indices = saddle(M)
%Input M is a matrix
%Output indices is a matrix of exactly two columns
%Example indices = saddle([1 2 3;4 5 6;7 8 9])
indices=[];
[m,n]=size(M);
for i=1:n
    for j=1:m
        a=min(M(:,i));  %minimum element in a column
        b=max(M(j,:));  %maximum element in a row
        if M(j,i)==a && a==b 
            indices=[indices;j i];
        end
    end
end