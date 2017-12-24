function G = letter_grade(score)
if score >= 91
G = 'A';
elseif score >= 81
G = 'B';
elseif score >= 71
G = 'C';
elseif score >= 61
G = 'D';
else
G = 'F';
end
end