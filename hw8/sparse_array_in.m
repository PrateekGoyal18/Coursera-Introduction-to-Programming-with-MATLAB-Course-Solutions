function A=sparse_array_in(filename)
%Input filename is a binary file
%Output 2D array
fid = fopen(filename,'r');
if fid < 0
    error('error opening file %s\n',filename);
end
r = fread(fid,1,'uint32');%row index
c = fread(fid,1,'uint32');%column index
n = fread(fid,1,'uint32');%value
A=zeros(r,c);
for i=1:n
    row = fread(fid,1,'uint32');
    col = fread(fid,1,'uint32');
    v = fread(fid,1,'double');
    A(row,col)=v;
end
fclose(fid);