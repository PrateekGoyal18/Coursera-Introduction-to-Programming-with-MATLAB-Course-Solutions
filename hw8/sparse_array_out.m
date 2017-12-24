function output = sparse_array_out(A,data_name)
% The first argument(A) is a two two-dimensional array of doubles
% And the second argument is(data_name),it writes into a binary file
fid = fopen(data_name,'w+');
output = true; % Output argument is type logical  - Inializate output
if fid < 0
  output = false; % MSG error - If we have problem opening we need to change output for FALSE
  return;
end
%// Filename needs to return off 3 unit32 scalars
[rows, cols] = size(A);
fwrite( fid,size(A,1),'uint32'); %% number of the rows
fprintf('Number of rows: %d %s\n', rows, class(rows));
fwrite( fid,size(A,2),'uint32'); %%number of the columns
fprintf('Number of cols: %d %s\n', cols,class(cols));
[r, c, v] = find(A); %% get non-zero element row, col ids and values
fwrite(fid,length(v),'uint32'); %% no of non-zero elements
fprintf('Number of non-zeros elements: %d %s\n', length(v), class(v));
for jj = 1:cols
  for ii = 1:rows
 id_row = ii;
 id_col = jj;
 id_value = A(ii, jj);
    if (A(ii, jj))~=0
        fwrite(fid, id_row,'uint32'); %% row id of non-zero element ii
        fprintf('Index row: %d %s\n',id_row,class(id_row));
        fwrite(fid, id_col,'uint32'); %% col id of non-zero element ii
       fprintf('Index column: %d %s\n',id_col, class(id_col));
       fwrite(fid,  id_value,'double'); %% value of non-zero element ii
       fprintf('Index value: %d %s\n',id_value, class(id_value));
 end
end
end
fclose( fid );
end