import pandas as pd

# Load the CSV file (semicolon delimited)
df = pd.read_csv("names.csv", delimiter=";")

# Separate Hullett 1 and Hullett 2
h1_df = df[df['Bed'].str.startswith("Hullett 1", na=False)]
h2_df = df[df['Bed'].str.startswith("Hullett 2", na=False)]

# Function to format: "5.15/B John Doe"
def format_name_list(df_subset):
    def format_entry(row):
        try:
            bed_parts = str(row['Bed']).split('/')
            bed_number = '/'.join(bed_parts[1:])  # Skip 'Hullett X'
            name = str(row['Boarder']).strip().title()
            return f"{bed_number} {name}"
        except:
            return None
    return df_subset.apply(format_entry, axis=1).dropna().sort_values().tolist()

# Get the formatted lists
h1_names = format_name_list(h1_df)
h2_names = format_name_list(h2_df)

# Output the results
print("Hullett 1 Boarders:")
for name in h1_names:
    print(f'"{name}",')

print("\nHullett 2 Boarders:")
for name in h2_names:
    print(f'"{name}",')
