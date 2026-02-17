import pandas as pd
import numpy as np
import os
import base64
import warnings
warnings.filterwarnings('ignore')
# ============================================
# COMPLETE UBER BANGALORE ANALYSIS DASHBOARD
# All-in-One: Dataset Overview + Business Analysis + Driver Income + PNG Images
# ============================================
print("=" * 100)
print("🚀 GENERATING COMPLETE UBER BANGALORE ANALYSIS DASHBOARD WITH IMAGES")
print("=" * 100)
# Load dataset
file_path = '/Users/rahulsingh/Desktop/banglo/viso/bangalore_ride_data.csv'
df = pd.read_csv(file_path)
print("\n✅ Step 1/6: Loading data...")
print(f"   Total records: {len(df):,}")
# Filter only UberXL and Go Sedan
df_filtered = df[df['Vehicle Type'].isin(['UberXL', 'Go Sedan'])].copy()
uberxl_data = df_filtered[df_filtered['Vehicle Type'] == 'UberXL']
go_sedan_data = df_filtered[df_filtered['Vehicle Type'] == 'Go Sedan']
# Successful rides only
uberxl_success = uberxl_data[uberxl_data['Booking Status'] == 'Success']
go_success = go_sedan_data[go_sedan_data['Booking Status'] == 'Success']
print(f"   UberXL rides: {len(uberxl_data):,} (Success: {len(uberxl_success):,})")
print(f"   Uber Go rides: {len(go_sedan_data):,} (Success: {len(go_success):,})")
# ============================================
# ENCODE PNG IMAGES
# ============================================
print("\n✅ Step 2/6: Loading and encoding PNG images...")
def encode_image(image_path):
    """Encode image to base64 for embedding in HTML"""
    if os.path.exists(image_path):
        with open(image_path, "rb") as img_file:
            encoded = base64.b64encode(img_file.read()).decode()
            print(f"   ✓ Encoded: {image_path} ({len(encoded)} chars)")
            return encoded
    else:
        print(f"   ⚠️ Not found: {image_path}")
        return None
# Try to load PNG images
img_driver_earnings = encode_image('driver_earnings_analysis.png')
img_order_interval = encode_image('order_time_interval_analysis.png')
img_profitability = encode_image('client_profitability_dashboard.png')
images_loaded = sum([1 for img in [img_driver_earnings, img_order_interval, img_profitability] if img])
print(f"   Images loaded: {images_loaded}/3")
# ============================================
# CALCULATE ALL METRICS
# ============================================
print("\n✅ Step 3/6: Calculating all metrics...")
# Dataset Overview Metrics
total_bookings = len(df)
missing_values = df.isnull().sum().sum()
total_cells = df.shape[0] * df.shape[1]
missing_percentage = (missing_values / total_cells) * 100
# Business Metrics
uberxl_revenue = uberxl_success['Booking Value'].sum()
go_revenue = go_success['Booking Value'].sum()
total_revenue = uberxl_revenue + go_revenue
uberxl_avg_fare = uberxl_success['Booking Value'].mean()
go_avg_fare = go_success['Booking Value'].mean()
uberxl_avg_distance = uberxl_success['Ride Distance'].mean()
go_avg_distance = go_success['Ride Distance'].mean()
uberxl_total_distance = uberxl_success['Ride Distance'].sum()
go_total_distance = go_success['Ride Distance'].sum()
total_distance = uberxl_total_distance + go_total_distance
# Success rates
uberxl_success_rate = (len(uberxl_success) / len(uberxl_data)) * 100
go_success_rate = (len(go_success) / len(go_sedan_data)) * 100
overall_success_rate = (len(uberxl_success) + len(go_success)) / len(df_filtered) * 100
# Ratings
uberxl_driver_rating = uberxl_success['Driver Ratings'].mean()
go_driver_rating = go_success['Driver Ratings'].mean()
uberxl_customer_rating = uberxl_success['Customer Ratings'].mean()
go_customer_rating = go_success['Customer Ratings'].mean()
# Cancellations
uberxl_driver_cancel = len(uberxl_data[uberxl_data['Booking Status'] == 'Cancelled by Driver'])
go_driver_cancel = len(go_sedan_data[go_sedan_data['Booking Status'] == 'Cancelled by Driver'])
uberxl_customer_cancel = len(uberxl_data[uberxl_data['Booking Status'] == 'Cancelled by Customer'])
go_customer_cancel = len(go_sedan_data[go_sedan_data['Booking Status'] == 'Cancelled by Customer'])
# Lost revenue
uberxl_lost_revenue = uberxl_data[uberxl_data['Booking Status'] != 'Success']['Booking Value'].sum()
go_lost_revenue = go_sedan_data[go_sedan_data['Booking Status'] != 'Success']['Booking Value'].sum()
total_lost_revenue = uberxl_lost_revenue + go_lost_revenue
# Cost calculations
UBER_COMMISSION_RATE = 0.25
UBERXL_FUEL_PER_KM = 8.0
GO_FUEL_PER_KM = 6.0
UBERXL_MAINTENANCE_PER_KM = 2.5
GO_MAINTENANCE_PER_KM = 1.8
UBERXL_INSURANCE = 4000
GO_INSURANCE = 2500
UBERXL_EMI = 25000
GO_EMI = 15000
OTHER_COSTS = 5000
uberxl_commission = uberxl_revenue * UBER_COMMISSION_RATE
go_commission = go_revenue * UBER_COMMISSION_RATE
uberxl_fuel_cost = uberxl_total_distance * UBERXL_FUEL_PER_KM
go_fuel_cost = go_total_distance * GO_FUEL_PER_KM
uberxl_maintenance = uberxl_total_distance * UBERXL_MAINTENANCE_PER_KM
go_maintenance = go_total_distance * GO_MAINTENANCE_PER_KM
uberxl_total_costs = (uberxl_commission + uberxl_fuel_cost + uberxl_maintenance + 
                      UBERXL_INSURANCE + UBERXL_EMI + OTHER_COSTS)
go_total_costs = (go_commission + go_fuel_cost + go_maintenance + 
                  GO_INSURANCE + GO_EMI + OTHER_COSTS)
uberxl_net_profit = uberxl_revenue - uberxl_total_costs
go_net_profit = go_revenue - go_total_costs
total_net_profit = uberxl_net_profit + go_net_profit
uberxl_profit_margin = (uberxl_net_profit / uberxl_revenue) * 100
go_profit_margin = (go_net_profit / go_revenue) * 100
overall_profit_margin = (total_net_profit / total_revenue) * 100
# Single driver calculations
RIDES_PER_DAY_UBERXL = 8
RIDES_PER_DAY_GO = 12
WORKING_DAYS = 26
uberxl_monthly_rides = RIDES_PER_DAY_UBERXL * WORKING_DAYS
go_monthly_rides = RIDES_PER_DAY_GO * WORKING_DAYS
driver_uberxl_gross = uberxl_avg_fare * uberxl_monthly_rides
driver_go_gross = go_avg_fare * go_monthly_rides
driver_uberxl_distance = uberxl_avg_distance * uberxl_monthly_rides
driver_go_distance = go_avg_distance * go_monthly_rides
driver_uberxl_commission = driver_uberxl_gross * UBER_COMMISSION_RATE
driver_go_commission = driver_go_gross * UBER_COMMISSION_RATE
driver_uberxl_fuel = driver_uberxl_distance * UBERXL_FUEL_PER_KM
driver_go_fuel = driver_go_distance * GO_FUEL_PER_KM
driver_uberxl_maint = driver_uberxl_distance * UBERXL_MAINTENANCE_PER_KM
driver_go_maint = driver_go_distance * GO_MAINTENANCE_PER_KM
driver_uberxl_expenses = (driver_uberxl_commission + driver_uberxl_fuel + driver_uberxl_maint +
                         UBERXL_INSURANCE + UBERXL_EMI + OTHER_COSTS)
driver_go_expenses = (driver_go_commission + driver_go_fuel + driver_go_maint +
                     GO_INSURANCE + GO_EMI + OTHER_COSTS)
driver_uberxl_net = driver_uberxl_gross - driver_uberxl_expenses
driver_go_net = driver_go_gross - driver_go_expenses
driver_uberxl_daily = driver_uberxl_net / WORKING_DAYS
driver_go_daily = driver_go_net / WORKING_DAYS
driver_uberxl_hourly = driver_uberxl_net / (WORKING_DAYS * 10)
driver_go_hourly = driver_go_net / (WORKING_DAYS * 10)
# Best and worst case
driver_uberxl_best = driver_uberxl_net * 1.3
driver_go_best = driver_go_net * 1.3
driver_uberxl_worst = driver_uberxl_net * 0.7
driver_go_worst = driver_go_net * 0.7
# Without EMI
driver_uberxl_no_emi = driver_uberxl_net + UBERXL_EMI
driver_go_no_emi = driver_go_net + GO_EMI
# Yearly projections
yearly_uberxl = driver_uberxl_net * 12
yearly_go = driver_go_net * 12
# Hourly data
uberxl_success['Hour'] = pd.to_datetime(uberxl_success['Time']).dt.hour
go_success['Hour'] = pd.to_datetime(go_success['Time']).dt.hour
uberxl_hourly_revenue = uberxl_success.groupby('Hour')['Booking Value'].sum()
go_hourly_revenue = go_success.groupby('Hour')['Booking Value'].sum()
# Top locations
top_uberxl_pickups = uberxl_success['Pickup Location'].value_counts().head(10)
top_go_pickups = go_success['Pickup Location'].value_counts().head(10)
print("   ✓ Revenue calculations")
print("   ✓ Cost analysis")
print("   ✓ Driver income projections")
print("   ✓ All metrics ready!")
# ============================================
# CREATE COMPREHENSIVE HTML DASHBOARD WITH IMAGES
# ============================================
print("\n✅ Step 4/6: Building HTML dashboard with embedded images...")
# Helper function to create image section
def create_image_section(img_base64, title, alt_text):
    if img_base64:
        return f"""
            <div class="section-header">{title}</div>
            <div class="image-container">
                <img src="data:image/png;base64,{img_base64}" alt="{alt_text}">
            </div>
        """
    else:
        return f"""
            <div class="section-header">{title}</div>
            <div class="warning-box">
                <h3>⚠️ Image Not Available</h3>
                <p>The file '{alt_text}.png' was not found in the current directory.</p>
            </div>
        """
html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uber Bangalore - Complete Analysis Dashboard</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }}
        
        .container {{
            max-width: 1600px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }}
        
        .header {{
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 3px solid #667eea;
        }}
        
        h1 {{
            color: #2c3e50;
            font-size: 3em;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }}
        
        .subtitle {{
            color: #7f8c8d;
            font-size: 1.3em;
            margin-top: 10px;
        }}
        
        .nav-tabs {{
            display: flex;
            gap: 15px;
            margin: 30px 0;
            border-bottom: 3px solid #e0e0e0;
            flex-wrap: wrap;
        }}
        
        .nav-tab {{
            padding: 18px 35px;
            cursor: pointer;
            background: #f8f9fa;
            border: none;
            border-radius: 12px 12px 0 0;
            font-size: 1.1em;
            font-weight: 600;
            transition: all 0.3s;
            color: #555;
        }}
        
        .nav-tab:hover {{
            background: #e9ecef;
            transform: translateY(-3px);
        }}
        
        .nav-tab.active {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }}
        
        .tab-content {{
            display: none;
            animation: fadeIn 0.5s;
        }}
        
        .tab-content.active {{
            display: block;
        }}
        
        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(20px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}
        
        .metrics-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin: 30px 0;
        }}
        
        .metric-card {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }}
        
        .metric-card::before {{
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: rgba(255,255,255,0.1);
            transform: rotate(45deg);
            transition: all 0.5s;
        }}
        
        .metric-card:hover {{
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }}
        
        .metric-card:hover::before {{
            top: -100%;
            right: -100%;
        }}
        
        .metric-label {{
            font-size: 1em;
            opacity: 0.95;
            margin-bottom: 12px;
            font-weight: 500;
        }}
        
        .metric-value {{
            font-size: 2.5em;
            font-weight: bold;
            position: relative;
            z-index: 1;
        }}
        
        .metric-subtext {{
            font-size: 0.9em;
            opacity: 0.9;
            margin-top: 8px;
        }}
        
        .chart-container {{
            margin: 35px 0;
            background: #f8f9fa;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }}
        
        .image-container {{
            margin: 35px 0;
            background: #f8f9fa;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            text-align: center;
        }}
        
        .image-container img {{
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }}
        
        .section-header {{
            color: #2c3e50;
            font-size: 2em;
            margin: 50px 0 30px 0;
            padding-bottom: 15px;
            border-bottom: 4px solid #667eea;
            position: relative;
        }}
        
        .section-header::after {{
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100px;
            height: 4px;
            background: #764ba2;
        }}
        
        .warning-box {{
            background: #f8d7da;
            border-left: 6px solid #dc3545;
            padding: 25px;
            margin: 25px 0;
            border-radius: 8px;
        }}
        
        .warning-box h3 {{
            color: #721c24;
            margin-bottom: 15px;
            font-size: 1.5em;
        }}
        
        .warning-box p {{
            color: #721c24;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 Uber Bangalore Analysis</h1>
            <p class="subtitle">Complete Business Intelligence Dashboard - UberXL vs Uber Go</p>
            <p class="subtitle" style="font-size: 1em; margin-top: 5px;">Data Period: January 2024 (31 days) | Images Loaded: {images_loaded}/3</p>
        </div>
        
        <div class="nav-tabs">
            <button class="nav-tab active" onclick="showTab('overview')">📊 Overview</button>
            <button class="nav-tab" onclick="showTab('business')">💼 Business Analysis</button>
            <button class="nav-tab" onclick="showTab('driver')">👤 Driver Income</button>
            <button class="nav-tab" onclick="showTab('insights')">💡 Final Verdict</button>
        </div>
        <!-- TAB 1: OVERVIEW -->
        <div id="overview" class="tab-content active">
            <h2 class="section-header">📊 Dataset Overview & Statistics</h2>
            
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-label">📈 Total Records</div>
                    <div class="metric-value">{total_bookings:,}</div>
                    <div class="metric-subtext">All bookings</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">🚗 UberXL Rides</div>
                    <div class="metric-value">{len(uberxl_data):,}</div>
                    <div class="metric-subtext">{len(uberxl_data)/len(df_filtered)*100:.1f}% of focus data</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">🚕 Uber Go Rides</div>
                    <div class="metric-value">{len(go_sedan_data):,}</div>
                    <div class="metric-subtext">{len(go_sedan_data)/len(df_filtered)*100:.1f}% of focus data</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">⚠️ Missing Data</div>
                    <div class="metric-value">{missing_percentage:.1f}%</div>
                    <div class="metric-subtext">{missing_values:,} missing values</div>
                </div>
            </div>
        </div>
        <!-- TAB 2: BUSINESS ANALYSIS -->
        <div id="business" class="tab-content">
            <h2 class="section-header">💼 Business Profitability Analysis</h2>
            
            <div class="metrics-grid">
                <div class="metric-card" style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);">
                    <div class="metric-label">💰 Total Revenue</div>
                    <div class="metric-value">₹{total_revenue/1000000:.2f}M</div>
                    <div class="metric-subtext">Monthly revenue (31 days)</div>
                </div>
                <div class="metric-card" style="background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);">
                    <div class="metric-label">💵 Net Profit</div>
                    <div class="metric-value">₹{total_net_profit/1000000:.2f}M</div>
                    <div class="metric-subtext">After all expenses</div>
                </div>
                <div class="metric-card" style="background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);">
                    <div class="metric-label">📊 Profit Margin</div>
                    <div class="metric-value">{overall_profit_margin:.1f}%</div>
                    <div class="metric-subtext">Overall margin</div>
                </div>
                <div class="metric-card" style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);">
                    <div class="metric-label">💸 Lost Revenue</div>
                    <div class="metric-value">₹{total_lost_revenue/1000000:.2f}M</div>
                    <div class="metric-subtext">From cancellations</div>
                </div>
            </div>
            {create_image_section(img_profitability, '📊 Client Vehicle Profitability Dashboard', 'client_profitability_dashboard')}
            
            {create_image_section(img_order_interval, '⏱️ Order Time Interval Analysis', 'order_time_interval_analysis')}
        </div>
        <!-- TAB 3: DRIVER INCOME -->
        <div id="driver" class="tab-content">
            <h2 class="section-header">👤 Single Driver Monthly Income Analysis</h2>
            
            <div class="metrics-grid">
                <div class="metric-card" style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);">
                    <div class="metric-label">🚗 UberXL Driver</div>
                    <div class="metric-value">₹{driver_uberxl_net:,.0f}</div>
                    <div class="metric-subtext">Monthly net income</div>
                </div>
                <div class="metric-card" style="background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);">
                    <div class="metric-label">🚕 Uber Go Driver</div>
                    <div class="metric-value">₹{driver_go_net:,.0f}</div>
                    <div class="metric-subtext">Monthly net income</div>
                </div>
                <div class="metric-card" style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);">
                    <div class="metric-label">📅 Daily Earnings</div>
                    <div class="metric-value">₹{max(driver_uberxl_daily, driver_go_daily):,.0f}</div>
                    <div class="metric-subtext">Best performer</div>
                </div>
                <div class="metric-card" style="background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);">
                    <div class="metric-label">⏰ Hourly Rate</div>
                    <div class="metric-value">₹{max(driver_uberxl_hourly, driver_go_hourly):,.0f}</div>
                    <div class="metric-subtext">Best performer</div>
                </div>
            </div>
            {create_image_section(img_driver_earnings, '📈 Single Driver Daily Earnings & Orders Analysis', 'driver_earnings_analysis')}
        </div>
        <!-- TAB 4: FINAL VERDICT -->
        <div id="insights" class="tab-content">
            <h2 class="section-header">🎯 Final Verdict & Recommendations</h2>
            
            <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 40px; border-radius: 20px; margin: 40px 0; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <h2 style="font-size: 2.5em; margin-bottom: 20px;">🏆 Winner: {'UberXL' if uberxl_net_profit > go_net_profit else 'Uber Go'}</h2>
                <p style="font-size: 1.3em; margin: 15px 0; line-height: 1.6;"><strong>Monthly Profit:</strong> ₹{max(uberxl_net_profit, go_net_profit)/1000:.1f}K vs ₹{min(uberxl_net_profit, go_net_profit)/1000:.1f}K</p>
                <p style="font-size: 1.3em; margin: 15px 0; line-height: 1.6;"><strong>Profit Margin:</strong> {max(uberxl_profit_margin, go_profit_margin):.1f}% vs {min(uberxl_profit_margin, go_profit_margin):.1f}%</p>
                <p style="font-size: 1.3em; margin: 15px 0; line-height: 1.6;"><strong>Best Driver Income:</strong> {'UberXL (₹' + f'{driver_uberxl_net:,.0f}' + ')' if driver_uberxl_net > driver_go_net else 'Uber Go (₹' + f'{driver_go_net:,.0f}' + ')'}</p>
            </div>
        </div>
        <div style="text-align: center; margin-top: 60px; padding-top: 40px; border-top: 3px solid #e0e0e0; color: #7f8c8d;">
            <p><strong>📅 Report Generated:</strong> {pd.Timestamp.now().strftime('%B %d, %Y at %I:%M %p')}</p>
            <p><strong>📊 Data Period:</strong> January 2024 (31 days)</p>
            <p><strong>🖼️ Embedded Images:</strong> {images_loaded}/3</p>
            <p style="margin-top: 20px;">Dashboard created for business decision-making purposes</p>
        </div>
    </div>
    <script>
        function showTab(tabName) {{
            var contents = document.getElementsByClassName('tab-content');
            for (var i = 0; i < contents.length; i++) {{
                contents[i].classList.remove('active');
            }}
            
            var tabs = document.getElementsByClassName('nav-tab');
            for (var i = 0; i < tabs.length; i++) {{
                tabs[i].classList.remove('active');
            }}
            
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }}
    </script>
</body>
</html>
"""
print("   ✓ HTML structure created")
print("   ✓ PNG images embedded")
# ============================================
# SAVE HTML FILE
# ============================================
print("\n✅ Step 5/6: Saving dashboard...")
output_path = os.path.join(os.getcwd(), 'uber_complete_dashboard.html')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html_content)
print(f"   ✓ File saved: {output_path}")
# ============================================
# CREATE SUMMARY CSV
# ============================================
print("\n✅ Step 6/6: Creating summary CSV report...")
summary_data = {
    'Category': [
        '=== DATASET OVERVIEW ===',
        'Total Bookings',
        'UberXL Rides',
        'Uber Go Rides',
        'Missing Data %',
        'Images Loaded',
        '',
        '=== BUSINESS METRICS ===',
        'Total Revenue',
        'UberXL Revenue',
        'Uber Go Revenue',
        'Net Profit',
        'UberXL Profit',
        'Uber Go Profit',
        'Overall Profit Margin',
        'Lost Revenue',
        '',
        '=== OPERATIONAL METRICS ===',
        'Overall Success Rate',
        'UberXL Success Rate',
        'Uber Go Success Rate',
        'UberXL Avg Rating',
        'Uber Go Avg Rating',
        'Driver Cancellations',
        'Customer Cancellations',
        '',
        '=== DRIVER INCOME ===',
        'UberXL Driver Monthly',
        'Uber Go Driver Monthly',
        'UberXL Daily Income',
        'Uber Go Daily Income',
        'UberXL Hourly Income',
        'Uber Go Hourly Income',
        '',
        '=== PROJECTIONS ===',
        'UberXL Yearly Income',
        'Uber Go Yearly Income',
        'Best Case UberXL',
        'Best Case Uber Go',
        'Worst Case UberXL',
        'Worst Case Uber Go'
    ],
    'Value': [
        '',
        f'{total_bookings:,}',
        f'{len(uberxl_data):,}',
        f'{len(go_sedan_data):,}',
        f'{missing_percentage:.1f}%',
        f'{images_loaded}/3',
        '',
        '',
        f'₹{total_revenue:,.0f}',
        f'₹{uberxl_revenue:,.0f}',
        f'₹{go_revenue:,.0f}',
        f'₹{total_net_profit:,.0f}',
        f'₹{uberxl_net_profit:,.0f}',
        f'₹{go_net_profit:,.0f}',
        f'{overall_profit_margin:.2f}%',
        f'₹{total_lost_revenue:,.0f}',
        '',
        '',
        f'{overall_success_rate:.2f}%',
        f'{uberxl_success_rate:.2f}%',
        f'{go_success_rate:.2f}%',
        f'{uberxl_driver_rating:.2f}/5.0',
        f'{go_driver_rating:.2f}/5.0',
        f'{uberxl_driver_cancel + go_driver_cancel:,}',
        f'{uberxl_customer_cancel + go_customer_cancel:,}',
        '',
        '',
        f'₹{driver_uberxl_net:,.0f}',
        f'₹{driver_go_net:,.0f}',
        f'₹{driver_uberxl_daily:,.0f}',
        f'₹{driver_go_daily:,.0f}',
        f'₹{driver_uberxl_hourly:,.0f}',
        f'₹{driver_go_hourly:,.0f}',
        '',
        '',
        f'₹{yearly_uberxl:,.0f}',
        f'₹{yearly_go:,.0f}',
        f'₹{driver_uberxl_best:,.0f}',
        f'₹{driver_go_best:,.0f}',
        f'₹{driver_uberxl_worst:,.0f}',
        f'₹{driver_go_worst:,.0f}'
    ]
}
summary_df = pd.DataFrame(summary_data)
summary_path = os.path.join(os.getcwd(), 'uber_complete_summary.csv')
summary_df.to_csv(summary_path, index=False)
print(f"   ✓ Summary CSV saved: {summary_path}")
# ============================================
# COMPLETION MESSAGE
# ============================================
print("\n" + "=" * 100)
print("🎉 DASHBOARD GENERATION COMPLETE!")
print("=" * 100)
print(f"\n📁 FILES CREATED:")
print(f"   1. {output_path}")
print(f"   2. {summary_path}")
print(f"\n🖼️ PNG IMAGES STATUS:")
if img_driver_earnings:
    print(f"   ✅ driver_earnings_analysis.png - EMBEDDED")
else:
    print(f"   ❌ driver_earnings_analysis.png - NOT FOUND")
if img_order_interval:
    print(f"   ✅ order_time_interval_analysis.png - EMBEDDED")
else:
    print(f"   ❌ order_time_interval_analysis.png - NOT FOUND")
if img_profitability:
    print(f"   ✅ client_profitability_dashboard.png - EMBEDDED")
else:
    print(f"   ❌ client_profitability_dashboard.png - NOT FOUND")
print(f"\n💡 NOTE:")
print(f"   • Place PNG files in the same directory as this script")
print(f"   • Expected filenames:")
print(f"     - driver_earnings_analysis.png")
print(f"     - order_time_interval_analysis.png")
print(f"     - client_profitability_dashboard.png")
print(f"\n🚀 HOW TO USE:")
print(f"   1. Open 'uber_complete_dashboard.html' in any web browser")
print(f"   2. Navigate through 4 tabs to explore the analysis")
print(f"   3. PNG images are embedded in relevant sections")
print(f"   4. Dashboard is completely standalone - share the HTML file!")
print("\n" + "=" * 100)
print("✅ READY TO PRESENT!")
print("=" * 100)


