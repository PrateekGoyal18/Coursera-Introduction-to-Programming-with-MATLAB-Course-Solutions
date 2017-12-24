function M=identity(n)
M(n,n)=0;
M(1:n+1:end)=1;
end